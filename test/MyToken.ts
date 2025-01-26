import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MyToken contact', () => {
  it('トークンの前供給量を所有者に割り当てる', async () => {
    // 最初に取得できるアカウントをOwnerとして設定
    const [owner] = await ethers.getSigners();

    // MyTokenをデプロイ
    const myToken = await ethers.deployContract('MyToken');

    // blanceOf関数を呼び出しOwnerのトークン量を取得
    const ownerBalance = await myToken.balanceOf(owner.address);

    // Ownerのトークン量がこのコンストラクトの全供給量に一致するか確認
    expect(await myToken.totalSupply()).to.equal(ownerBalance);
  });
});
