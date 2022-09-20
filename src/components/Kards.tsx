import React from 'react';
import { GiAbdominalArmor, GiSamusHelmet, GiSleevelessJacket, GiSunglasses, GiQuillInk } from 'react-icons/gi'
import './Kards.css'


type Props = {
    loaded: boolean;
    holderAddress: string;
    contractAddress: string;
    tokenIds: Map<number, []> | undefined;
    images: Map<number, string> | undefined;
}


export const Kards: React.FC<Props> = ({
    loaded,
    holderAddress,
    contractAddress,
    tokenIds,
    images,
}) => {

    const rendered: React.ReactElement[]= [];
    if (!holderAddress || !loaded) {} else {
        console.log(contractAddress)
        if (tokenIds === undefined ){return <>None Found</>}
        
        let itemKey = Math.random()
        
        for(let [key, value] of tokenIds) {
            //const openseaLink = "https://opensea.io/assets/ethereum/" + contractAddress + "/" + key
            if (!value) {
                console.log(key)

                let keyImage = images?.get(key)

                const component = createKomponent2(key,keyImage,contractAddress)
                rendered.push(component);
            } else if (key){
                let traits: any[] = []
                let jsonItemList = []
                let aType
                let hType
                let cType
                let fwType
                let tType
                for(let item of value) {
                    const jsonItem = JSON.parse(JSON.stringify(item))
                    if (jsonItem.trait_type !== undefined && jsonItem.value !== 'None' && jsonItem.value !== 0) { 
                        traits.push(React.createElement("div", {key: itemKey++}, jsonItem.trait_type, ' : ', jsonItem.value))
                        jsonItemList.push(jsonItem) 
                        if (jsonItem.trait_type === 'ARMOUR' && !aType){ aType =jsonItem.value } 
                        if (jsonItem.trait_type === 'HELMET' && !hType){ hType = jsonItem.value } 
                        if (jsonItem.trait_type === 'CLOTHING' && !aType){ cType =jsonItem.value } 
                        if (jsonItem.trait_type === 'FACE WEAR' && !hType){ fwType = jsonItem.value } 
                        if (jsonItem.trait_type === 'TATTOO' && !hType){ tType = jsonItem.value } 
                    } else {
                        //todo: clothes
                        //console.log(item)
                    }
                    
                }
                console.log(key, jsonItemList)
                let iconDiv
                if (!aType) {
                    iconDiv = 
                    <div className='icons'>
                        <div hidden={!tType}>
                            <GiQuillInk /> {tType}
                        </div>                            
                        <div hidden={!fwType}>
                            <GiSunglasses /> {fwType}
                        </div>
                        <div hidden={!cType}>
                            <GiSleevelessJacket/> {cType}  
                        </div>  
                    </div>
                } else {
                    iconDiv =
                        <div className='icons'>
                            <div hidden={!tType}>
                                <GiQuillInk /> {tType}
                            </div>
                            <div hidden={!fwType}>
                                <GiSunglasses /> {fwType}
                            </div>
                            <div hidden={!hType}>
                                <GiSamusHelmet /> {hType}
                            </div>
                            <div hidden={!aType}>
                                <GiAbdominalArmor/> {aType}  
                            </div>  
                        </div>
                }
                let keyImage = images?.get(key)

                
                const component = createKomponent(key,keyImage,iconDiv,traits,contractAddress)
                rendered.push(component);
            }
        }
    } 
    return (
        <div className='CardBox '>
            
                {rendered}

        </div>
    )
}

const createKomponent = (key: number, keyImage: string | undefined, iconDiv: JSX.Element | undefined, traits: any[], contractAddress: string) => {
    const openseaLink = "https://opensea.io/assets/ethereum/" + contractAddress + "/" + key
    if (keyImage?.substring(0,7) === 'ipfs://') { 
        keyImage = 'https://dweb.link/ipfs/' + keyImage?.slice(7, keyImage.length)
    }
    const component = React.createElement("div", {key: key, align: 'center', className: 'Card' },
        <div className='flip-card'>
            <div className='card-front'>
                <figure>
                    <div className='CardImageFrame'>
                        <img className='CardImage img-fluid'src={keyImage} alt={keyImage} />
                    </div>
                </figure>
                <div className='CardTitle'>
                    #{key}
                </div>
                <span className='CardFrontBody'>
                    {iconDiv}
                </span>
            </div>
            <div className='card-back'>
                <div className='CardBackBody'>
                    <div className='CardSubtitle'>
                        {traits}
                    </div>
                    <div className='ButtonBox'>
                        <button className='inspect' onClick={(e: { preventDefault: () => void; }) => 
                            { e.preventDefault(); window.open(
                                openseaLink,
                                '_blank' // <- This is what makes it open in a new window.
                            ); }}>
                            OpenSea.io</button>
                        <div className='CardText'>
                            {contractAddress}
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
    return <>{component}</>
}

const createKomponent2 = (key: number, keyImage: string | undefined, contractAddress: string) => {
    const openseaLink = "https://opensea.io/assets/ethereum/" + contractAddress + "/" + key
    //let randomKey = Math.random()
    if (keyImage?.substring(0,7) === 'ipfs://') { 
        keyImage = 'https://dweb.link/ipfs/' + keyImage?.slice(7, keyImage.length)
    }
        console.log(key)


        const component = React.createElement("div", {key: key, align:"center",
                className: 'Card'},
            <div className='flip-card '>
                <div className='card-front'>
                    <figure className='CardImageFrame'>
                        <img className='CardImage img-fluid'src={keyImage} alt={keyImage} />
                    </figure>
                    <div className='CardTitle'>
                            #{key}
                    </div>
                    <span className='CardFrontBody'>

                    </span>
                </div>
                <div className='card-back'>
                    <div className='CardBackBody'>
                        <div className='CardSubtitle'>

                        </div>
                        <div className='ButtonBox'>
                            <button className='inspect' onClick={(e: { preventDefault: () => void; }) => 
                                { e.preventDefault(); window.open(
                                    openseaLink,
                                    '_blank' // <- This is what makes it open in a new window.
                                ); }}>
                                OpenSea.io</button>
                            <div className='CardText'>
                                {contractAddress}
                            </div>
                        </div>
                    </div>
                </div>
                    
            </div>

            
        )
        
    
    return <>{component}</>
}


export default Kards
