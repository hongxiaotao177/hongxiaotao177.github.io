#!/usr/bin/env python3
"""AI管家学习成员发布件核验脚本。

只读公开网页；网页不通时改读公开仓，不保存也不接受任何钥匙。套装内的
真实安装仍由首页原有查牌、下载、写壳、回读链完成；本脚本用于发布后的机器复核。
"""
from __future__ import annotations

import base64
import hashlib
import json
import re
import sys
from urllib.request import Request, urlopen

BASE = "https://hongxiaotao177.github.io/"
API = "https://api.github.com/repos/hongxiaotao177/hongxiaotao177.github.io/contents/"
FILES = {
    "index": "index.html",
    "aimanager": "software-aimanager.html",
    "version-index": "version-index.json",
    "version-aimanager": "version-aimanager.json",
    "version-all": "version-all.json",
    "task": "%E5%8F%91%E7%89%88%E4%BB%BB%E5%8A%A1%E5%8D%95.json",
}


def fetch(path: str) -> bytes:
    headers = {"Cache-Control": "no-cache", "User-Agent": "suit-install-check"}
    try:
        with urlopen(Request(BASE + path, headers=headers), timeout=30) as response:
            if response.status != 200:
                raise RuntimeError(f"下载失败：{path}，状态{response.status}")
            return response.read()
    except Exception as web_error:
        print(f"公开网页暂不可读，改从公开仓核对：{path}")
        try:
            api_headers = dict(headers, Accept="application/vnd.github+json")
            with urlopen(Request(API + path + "?ref=main", headers=api_headers), timeout=30) as response:
                payload = json.loads(response.read())
            return base64.b64decode(payload["content"])
        except Exception as api_error:
            raise RuntimeError(f"公开网页和公开仓均读取失败：{path}；{web_error}；{api_error}") from api_error


def signature(data: bytes) -> str:
    return hashlib.md5(data).hexdigest()[:16]


def main() -> int:
    data = {name: fetch(path) for name, path in FILES.items()}
    index = data["index"].decode("utf-8")
    member = data["aimanager"].decode("utf-8")
    vi = json.loads(data["version-index"])
    vm = json.loads(data["version-aimanager"])
    va = json.loads(data["version-all"])
    task = json.loads(data["task"])

    checks = {
        "首页登记": 'aimanager:["software-aimanager.html", "AI管家学习.html", "version-aimanager.json", "tagAimanager"]' in index,
        "首页新成员未安装标记": 'aimanager:"0"' in index,
        "首页版本真值": re.findall(r'CUR\.index="([0-9.]+)"', re.sub(r"/\*[\s\S]*?\*/", "", index))[-1] == vi["version"],
        "学习成员指纹": signature(data["aimanager"]) == vm["sig"],
        "首页指纹": signature(data["index"]) == vi["sig"],
        "汇总牌成员": any(x.get("key") == "aimanager" and x.get("version") == vm["version"] and x.get("sig") == vm["sig"] for x in va["items"]),
        "任务单成员": any(x.get("key") == "aimanager" and x.get("sig") == vm["sig"] for x in task["items"]),
        "问话入口": 'id="sendBtn"' in member,
        "点亮菜单": "支持这个观点的高质量文献" in member,
        "三个底部入口": all(x in member for x in ["问话", "对话仓库", "知识脑图"]),
        "手动成书": 'id="bookBtn"' in member,
        "公开件无常见钥匙格式": not re.search(r"github_pat_|sk-[A-Za-z0-9_-]{16,}|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY", member),
    }
    failed = [name for name, ok in checks.items() if not ok]
    for name, ok in checks.items():
        print(("通过 " if ok else "失败 ") + name)
    print(f"学习成员版本={vm['version']} 字节={len(data['aimanager'])} 指纹={vm['sig']}")
    print(f"首页版本={vi['version']} 字节={len(data['index'])} 指纹={vi['sig']}")
    if failed:
        print("核验未通过：" + "、".join(failed), file=sys.stderr)
        return 1
    print("发布件核验通过；手机是否吃到并正常使用，仍须真机验收。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
