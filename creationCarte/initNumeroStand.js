import fs from "fs"
import convert from "xml-js"
const dataBuffer = fs.readFileSync('carte.svg')
const data=convert.xml2js(dataBuffer, {compact: true, spaces: 4})
const aa=data.svg.g//g=aa=L calque - aa[i].a= L salle

const CALQUE_STAND=0
const listeSalle=aa[CALQUE_STAND].a
let i,j,numSalle;
aa[CALQUE_STAND]._attributes.id="listeStand";
for (i in listeSalle){
    numSalle=parseInt(i)+1
    listeSalle[i]._attributes.id="salle"+numSalle
    delete listeSalle[i]._attributes.style
    for (j in listeSalle[i].rect){
            // console.log(listeSalle[i].rect[j])
        listeSalle[i].rect[j]._attributes.id=(numSalle*100+parseInt(j)).toString()
        delete listeSalle[i].rect[j]._attributes.style
        // listeSalle[i].rect[j]._attributes.style="z-index:1"
    }
}

const calqueBatiment=aa[1-CALQUE_STAND]
console.log(calqueBatiment.a)
const listeBatiment=calqueBatiment.a.find(b=>b.rect.length==3)
listeBatiment._attributes.id="listeBatiment"
console.log(listeBatiment.rect)
for (const i in listeBatiment.rect) {
    listeBatiment.rect[i]._attributes.id="batiment"+(parseInt(i)+1)
}

//     console.log(listeSalle[1]._attributes.id)
//     console.log(listeSalle[1].rect[10]._attributes.id)
// console.log(data.svg.g[1].a[1].rect[14]._attributes.id)
// console.log(data.svg.g[1].a[1].rect)
let file=convert.js2xml(data,{compact: true, spaces: 4})
console.log(file)
fs.writeFileSync("carteFormate.svg",file)
