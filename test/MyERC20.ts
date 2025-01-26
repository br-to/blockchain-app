import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MyERC20 contact', () => {
  it('トークンの前供給量を所有者に割り当てる', async () => {
    // 最初に取得できるアカウントをOwnerとして設定
    const [owner] = await ethers.getSigners();

    //  MyERC20をデプロイ
    const myERC20 = await ethers.deployContract('MyERC20');

    // blanceOf関数を呼び出しOwnerのトークン量を取得
    const ownerBalance = await myERC20.balanceOf(owner.address);

    // Ownerのトークン量がこのコンストラクトの全供給量に一致するか確認
    expect(await myERC20.totalSupply()).to.equal(ownerBalance);
  });
});
