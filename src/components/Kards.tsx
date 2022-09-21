import React from 'react';
import { GiAbdominalArmor, GiSamusHelmet, GiSleevelessJacket, GiSunglasses, GiQuillInk } from 'react-icons/gi'
import { JsxEmit } from 'typescript';
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
        if (tokenIds === undefined ){return <>None Found</>}
        for(let [key, value] of tokenIds) {     
            if (!value) {              
                let keyImage = images?.get(key)
                const component = createKomponent(key,keyImage,contractAddress)
                rendered.push(component);
            } else if (key){
                const attribute = new Traits()
                const  traits = getTraits(value, attribute)
                const iconDiv = createIconDiv(attribute)
                let keyImage = images?.get(key)
                const component = createKomponent(key,keyImage,contractAddress,iconDiv,traits)
                rendered.push(component);
            }
        }
    } 
    return <div className='CardBox'>{rendered}</div>
}


class Traits {
    aType: any
    hType: any
    cType: any
    fwType: any
    tType: any
}
const getTraits =(value: [], attribute: Traits) => {
    let itemKey = Math.random()
    let traits: any[] = []
    for(let item of value) {
        const jsonItem = JSON.parse(JSON.stringify(item))
        if (jsonItem.trait_type !== undefined && jsonItem.value !== 'None' && jsonItem.value !== 0) { 
            traits.push(React.createElement("div", {key: itemKey++}, jsonItem.trait_type, ' : ', jsonItem.value))
            if (jsonItem.trait_type === 'ARMOUR' && !attribute.aType){ attribute.aType =jsonItem.value } 
            if (jsonItem.trait_type === 'HELMET' && !attribute.hType){ attribute.hType = jsonItem.value } 
            if (jsonItem.trait_type === 'CLOTHING' && !attribute.aType){ attribute.cType =jsonItem.value } 
            if (jsonItem.trait_type === 'FACE WEAR' && !attribute.hType){ attribute.fwType = jsonItem.value } 
            if (jsonItem.trait_type === 'TATTOO' && !attribute.hType){ attribute.tType = jsonItem.value } 
        }                     
    }
    return traits
}
const createIconDiv = (attribute: Traits) => {
    let iconDiv
    if (!attribute.aType) {
        iconDiv = 
        <div className='icons'>
            <div hidden={!attribute.tType}>
                <GiQuillInk /> {attribute.tType}
            </div>                            
            <div hidden={!attribute.fwType}>
                <GiSunglasses /> {attribute.fwType}
            </div>
            <div hidden={!attribute.cType}>
                <GiSleevelessJacket/> {attribute.cType}  
            </div>  
        </div>
    } else {
        iconDiv =
            <div className='icons'>
                <div hidden={!attribute.tType}>
                    <GiQuillInk /> {attribute.tType}
                </div>
                <div hidden={!attribute.fwType}>
                    <GiSunglasses /> {attribute.fwType}
                </div>
                <div hidden={!attribute.hType}>
                    <GiSamusHelmet /> {attribute.hType}
                </div>
                <div hidden={!attribute.aType}>
                    <GiAbdominalArmor/> {attribute.aType}  
                </div>  
            </div>
    }
    return iconDiv
}

const createKomponent = (key: number, keyImage: string | undefined, contractAddress: string, iconDiv?: JSX.Element | undefined, traits?: any[]) => {
    const openseaLink = "https://opensea.io/assets/ethereum/" + contractAddress + "/" + key
    if (keyImage?.substring(0,7) === 'ipfs://') { 
        keyImage = 'https://dweb.link/ipfs/' + keyImage?.slice(7, keyImage.length)
    }
    const component = React.createElement("div", {key: key, className: 'Card' },
        <div className='flip-card'>
            <div className='card-front'>
                <div className='img-bg'></div>
                <figure className='CardImageFrame'>
                
                    <img className='CardImage img-fluid'src={keyImage} alt={keyImage} />
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
    return component
}

export default Kards
