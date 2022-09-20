import React, { useState } from 'react';
import logo from './Kryptoria_Without_BG_1.png';
import './App.css';
import InputForm from './components/InputForm';
import GetNFTs from './components/IdFinder'
import { ethers } from 'ethers'
import Kards from './components/Kards';

const App: React.FC = () => {
  
  const contractAddress = "0x63d85ec7b1561818ec03e158ec125a4113038a00"
  const landContractAddress = '0x17D084106C2f1C716ce39fa015AB022757d30C9A'
  const [holderAddress, setHolderAddress] = useState<string>('')
  const [someMsg, setSomeMsg] = useState<string>('')
  const [valid, setValid] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [tokenIds, setTokenIds] = useState<Map<number, []>>()
  const [images, setImages] = useState<Map<number, string>>()
  const [landLoaded, setLandLoaded] = useState<boolean>(false)
  const [landTokenIds, setLandTokenIds] = useState<Map<number, []>>()
  const [landImages, setLandImages] = useState<Map<number, string>>()

  const handleOnSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setTokenIds(undefined)
    if (!ethers.utils.isAddress(contractAddress) ) { setValid(false); setSomeMsg('Need Valid Address') } 
    else { setValid(true); setSomeMsg('') }
    setSomeMsg('') //hides message block
    setLoaded(false) //resets loaded before new fetch
  };

  return (
  <div className="App">
    <GetNFTs 
      holderAddress={holderAddress}
      contractAddress={contractAddress}
      loaded={loaded}
      setLoaded={setLoaded}
      valid={valid}
      tokenIds={tokenIds}
      setTokenIds={setTokenIds}
      setImages={setImages}
    />
    <GetNFTs 
      holderAddress={holderAddress}
      contractAddress={landContractAddress}
      loaded={landLoaded}
      setLoaded={setLandLoaded}
      valid={valid}
      tokenIds={landTokenIds}
      setTokenIds={setLandTokenIds}
      setImages={setLandImages}
    />
    <header className="App-header">
        <h1>Kryptoria Kards</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div hidden={!someMsg}>{someMsg}</div>
        <br />
        <InputForm
          setValid={setValid}
          setSomeMsg={setSomeMsg}
          holderAddress={holderAddress}
          setHolderAddress={setHolderAddress}
          handleOnSubmit={handleOnSubmit}
        />
        <br />
    </header>
    <Kards
      loaded={loaded}
      holderAddress={holderAddress}
      contractAddress={contractAddress}
      tokenIds={tokenIds}
      images={images}
    />
    <Kards
      loaded={landLoaded}
      holderAddress={holderAddress}
      contractAddress={landContractAddress}
      tokenIds={landTokenIds}
      images={landImages}
    />
  </div>
  );
}

export default App;
