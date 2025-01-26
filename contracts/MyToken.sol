//SPDX-License-Identifier: UNLICENSED

// solidityのバージョン指定
pragma solidity ^0.8.0;


contract MyToken {
    // トークンの名前定義
    string public name = "MyToken";

    // トークンの単位を定義
    string public symbol = "MYT";

    // トークンの最大供給量を定義
    uint256 public totalSupply = 1000000;

    // このコンストラクトのオーナーを定義
    address public owner;

    // トークンの所有者のアドレスと所有量を管理
    mapping(address => uint256) balances;

    // イベント定義
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /**
     * Contract initialization.
     */
    constructor() {
        // コンストラクト作成者に最大供給量分のトークンを設定
        balances[msg.sender] = totalSupply;
        // オーナーをコンストラクト作成者に設定
        owner = msg.sender;
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from *outside*
     * the contract.
     */
    function transfer(address to, uint256 amount) external {
        // この関数を実行したアドレスとの残高に指定したトークン量があるかチェック
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // この関数を実行したアドレスとの残高から指定したトークン量を差し引く
        balances[msg.sender] -= amount;
        // 指定したアドレスとの残高に指定したトークン量を加える
        balances[to] += amount;

        // イベント発火
        emit Transfer(msg.sender, to, amount);
    }

    /**
     * 指定したアドレスの残高を返す
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
