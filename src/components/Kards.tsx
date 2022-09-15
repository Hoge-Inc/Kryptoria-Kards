import React from 'react';
import { GiAbdominalArmor, GiSamusHelmet } from 'react-icons/gi'
import './Kards.css'


type Props = {
    loaded: boolean;
    holderAddress: string;
    contractAddress: string;
    tokenIds: Map<number, []> | undefined;
    images: Map<number, string> | undefined;
    cardRendered: boolean;
    setCardRendered: (val: boolean) => void;
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
        
        let itemKey = Math.random()
        for(let [key, value] of tokenIds) {
            const openseaLink = "https://opensea.io/assets/ethereum/" + contractAddress + "/" + key
            let traits: any[] = []
            let jsonItemList = []
            let aType
            let hType
            for(let item of value) {
                const jsonItem = JSON.parse(JSON.stringify(item))
                if (jsonItem.trait_type !== undefined && jsonItem.value !== 'None' && jsonItem.value !== 0) { 
                    traits.push(React.createElement("div", {key: itemKey++}, jsonItem.trait_type, ' : ', jsonItem.value))
                    jsonItemList.push(jsonItem) 
                    if (jsonItem.trait_type === 'ARMOUR' && !aType){ aType =jsonItem.value } 
                    if (jsonItem.trait_type === 'HELMET' && !hType){ hType = jsonItem.value } 
                }
            }
            console.log(key, jsonItemList)
            const iconDiv = !aType ? <div className='icons'>No Armour</div> :
                <div className='icons' hidden={!aType}>
                    <GiSamusHelmet /> {hType}
                    <br/>
                    <GiAbdominalArmor/> {aType}  
                </div>  
            let keyImage = images?.get(key)
            if (keyImage?.substring(0,7) === 'ipfs://') { 
                keyImage = 'https://ipfs.io/ipfs/' + keyImage?.slice(7, keyImage.length)
            }
            const component = React.createElement("div", {key: key, align:"center",
                    className: 'flip-card-container col-12 col-sm-6 col-lg-4 col-xl-2 '},
                <div className='flip-card Card'>
                    <div className='card-front'>
                        <figure>
                            <div className='CardImageFrame'>
                                <img className='CardImage img-fluid'src={keyImage} alt={keyImage} />
                            </div>
                        </figure>
                        <div className='CardTitle'>
                                #{key}
                        </div>
                        <span className='card-front-body'>

                            {iconDiv}
                        </span>
                        
                    </div>
                    
                    <div className='card-back'>
                        <div className='CardBody'>
                            <div className='CardSubtitle'>
                            <p/>{traits}<p/>
                            </div>
                            <br/>
                            <button className='inspect' onClick={(e: { preventDefault: () => void; }) => 
                                { e.preventDefault(); window.open(
                                    openseaLink,
                                    '_blank' // <- This is what makes it open in a new window.
                                ); }}>
                                OpenSea.io</button>
                            <p />
                            <div className='CardText'>
                                {contractAddress}
                            </div>
                        </div>
                    </div>
                        
                </div>

                
            )
            rendered.push(component);
        }
    } 
    return (
        <div className='CardBox '>
            <div className='row '>
                {rendered}
            </div>
        </div>
    )
}

export default Kards