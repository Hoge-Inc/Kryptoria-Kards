import React from 'react';
import { 
    GiAbdominalArmor, 
    GiSamusHelmet, 
    GiClothes, 
    GiSunglasses, 
    GiDrop,
    GiDrippingTube,
    GiGlobe,
    GiGearHammer,
    GiCastle
 } from 'react-icons/gi'
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
    armorType: any
    helmetType: any
    clothingType: any
    facewearType: any
    tattooType: any
    resourceType: any
    cords: any
    defenceType: any
    yield: any
    settlement: any
    bonus: any
}
const getTraits =(value: [], attribute: Traits) => {
    let itemKey = Math.random()
    let traits: any[] = []
    for(let item of value) {
        const jsonItem = JSON.parse(JSON.stringify(item))
        if (jsonItem.trait_type !== undefined && jsonItem.value !== 'None' && jsonItem.value !== 0) { 
            traits.push(React.createElement("div", {key: itemKey++}, jsonItem.trait_type, ' : ', jsonItem.value))
            if (jsonItem.trait_type === 'ARMOUR')       { attribute.armorType =jsonItem.value } 
            if (jsonItem.trait_type === 'HELMET')       { attribute.helmetType = jsonItem.value } 
            if (jsonItem.trait_type === 'CLOTHING')     { attribute.clothingType =jsonItem.value } 
            if (jsonItem.trait_type === 'FACE WEAR')    { attribute.facewearType = jsonItem.value } 
            if (jsonItem.trait_type === 'TATTOO')       { attribute.tattooType = jsonItem.value }
            if (jsonItem.trait_type === 'DEFENCE')      { attribute.defenceType = jsonItem.value }
            if (jsonItem.trait_type === 'RESOURCE')     { attribute.resourceType = jsonItem.value }
            if (jsonItem.trait_type === 'Yield')        { attribute.yield = jsonItem.value }
            if (jsonItem.trait_type === 'COORDINATES')  { attribute.cords = jsonItem.value }
            if (jsonItem.trait_type === 'Village')      { attribute.settlement = jsonItem.trait_type; attribute.bonus = jsonItem.value }
            if (jsonItem.trait_type === 'Town')         { attribute.settlement = jsonItem.trait_type; attribute.bonus = jsonItem.value }
            if (jsonItem.trait_type === 'City')         { attribute.settlement = jsonItem.trait_type; attribute.bonus = jsonItem.value }
            if (jsonItem.trait_type === 'Capital')      { attribute.settlement = jsonItem.trait_type; attribute.bonus = jsonItem.value }
            
            
            
        }                     
    }
    return traits
}
const createIconDiv = (attribute: Traits) => {
    let iconDiv
    if (attribute.armorType) {
        iconDiv =
        <div className='icons'>
            <div hidden={!attribute.tattooType}>
                <GiDrop /> {attribute.tattooType}
            </div>
            <div hidden={!attribute.facewearType}>
                <GiSunglasses /> {attribute.facewearType}
            </div>
            <div hidden={!attribute.helmetType}>
                <GiSamusHelmet /> {attribute.helmetType}
            </div>
            <div hidden={!attribute.armorType}>
                <GiAbdominalArmor/> {attribute.armorType}  
            </div>  
        </div>
    } else if (attribute.clothingType) {
        iconDiv = 
        <div className='icons'>
            <div hidden={!attribute.tattooType}>
                <GiDrop /> {attribute.tattooType}
            </div>                            
            <div hidden={!attribute.facewearType}>
                <GiSunglasses /> {attribute.facewearType}
            </div>
            <div hidden={!attribute.clothingType}>
                <GiClothes/> {attribute.clothingType}  
            </div>  
        </div>
    } else if (attribute.cords){
        iconDiv =
            <div className='icons'>
                <div hidden={!attribute.resourceType}>
                    <GiDrippingTube /> {attribute.resourceType}
                </div>
                <div hidden={!attribute.cords}>
                    <GiGlobe /> {attribute.cords}
                </div>
                <div hidden={!attribute.defenceType}>
                    <GiGearHammer /> {attribute.defenceType}
                </div>   
                <div hidden={!attribute.settlement}>
                    <GiCastle /> {attribute.settlement}
                </div>   
            </div>
    } else{
        iconDiv = <div className='icons'></div>
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
