'use client';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import artifact from '@/abi/MyToken.sol/MyToken.json';

// デプロイしたMyTokenのアドレス
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
export default function Home() {
  // MetaMaskなどが提供するイーサリアムプロパイダーを格納する変数
  const [windowEthereum, setWindowEhtereum] = useState();

  // MyTokenの所有数を格納する変数
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // イーサリアムプロバイダーを取得し、変数に代入
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const { ethereum } = window as any;
    setWindowEhtereum(ethereum);
  }, []);

  // ボタンを押下した時に実行される関数
  const handleButtonClick = async () => {
    if (windowEthereum) {
      // イーサリアムプロバイダーを設定
      const provider = new ethers.BrowserProvider(windowEthereum);

      // 署名オブジェクトの取得
      const signer = await provider.getSigner();

      // コンストラクトの取得
      const contract = new ethers.Contract(
        contractAddress,
        artifact.abi,
        provider
      );

      // ウォレットアドレスの取得
      const walletAddress: string = await signer.getAddress();

      // MyTokenコントラクトから指定したウォレットアドレスのトークン所有数を取得
      const balance = await contract.balanecOf(walletAddress);
      // BigIntリテラル付きで所有数が返されるのでテキストに変換して代入
      setInputValue(balance.toString());
    }
  };

  return (
    <div>
      <main>
        <h1>Blockchain Sample App</h1>
        <button type="button" onClick={handleButtonClick}>
          Tokens owned
        </button>
        <input type="text" value={inputValue} readOnly />
      </main>
    </div>
  );
}
