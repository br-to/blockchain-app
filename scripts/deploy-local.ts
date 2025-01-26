import { ethers } from 'hardhat';

const main = async () => {
  const myERC20 = await ethers.deployContract('MyERC20');
  await myERC20.waitForDeployment();
  console.log(`MyERC20 deployed to: ${myERC20.target}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
