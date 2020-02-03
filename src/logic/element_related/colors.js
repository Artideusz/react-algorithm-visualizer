import { rgb, random256 } from "../util";

const colorList = [
    {
        name: 'White',
        value: 'plain-white'
    },
    {
        name: 'Green',
        value: 'plain-green'
    },
    {
        name: 'Black',
        value: 'plain-black'
    },
    {
        name: 'Randomized',
        value: 'random'
    },
    {
        name: 'Rainbow',
        value: 'rainbow'
    },
    {
        name: 'Grayscale',
        value: 'grayscale'
    }
];


function updateColor(elements, val) {
    let clr;
    switch(val) {
        case 'plain-white':
            clr = ()=>rgb(255, 255, 255);
            break;
        case 'plain-green':
            clr = ()=>rgb(0,255,0);
            break;
        case 'plain-black':
            clr = ()=>rgb(0,0,0);
            break;
        case 'random':
            clr = ()=>rgb(random256(), random256(), random256());
            break;
        case 'rainbow':
            clr = (v)=>{
                let v2 = v/5;
                let frequency = 0.05;
                let red   = Math.sin(frequency*v2 + 0) * 127 + 128;
                let green = Math.sin(frequency*v2 + 2) * 127 + 128;
                let blue  = Math.sin(frequency*v2 + 4) * 127 + 128;
                return rgb(red, green, blue);
            };
            break;
        case 'grayscale':
            clr = ()=>{
                let v = random256();
                return rgb(v, v, v);
            }
            break;
        default:
            clr = ()=>rgb(255,255,255);
            break;
    }
    return elements.map((v,i)=>{
        let c = clr(v.value, i);
        v.red = c.red;
        v.green = c.green;
        v.blue = c.blue;
        v.brightness = c.brightness;
        v.rgb = c.rgb;
        return v;
    })
}

export {
    updateColor,
    colorList
}