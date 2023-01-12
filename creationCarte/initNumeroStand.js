import fs from "fs"
import convert from "xml-js"

const dataBuffer = fs.readFileSync('carte.svg')
const data = convert.xml2js(dataBuffer, {compact: true, spaces: 4})
// console.log(data)
const aa = data.svg.g//g=aa=L calque - aa[i].a= L salle

const CALQUE_STAND = 0
const listeSalle = aa[CALQUE_STAND].a
aa[CALQUE_STAND]._attributes.id = "listeStand";
delete listeSalle[CALQUE_STAND]._attributes["xlink:href"]
for (let i = 1; i < listeSalle.length; i++) {
    listeSalle[i]._attributes.id = "salle" + i
    // console.log(listeSalle[i].rect)
    // console.log(typeof listeSalle[i].rect)
    if (Array.isArray(listeSalle[i].rect)) {
        delete listeSalle[i]._attributes.style
        for (let j in listeSalle[i].rect) {
            listeSalle[i].rect[j]._attributes.id = (parseInt(i) * 100 + parseInt(j)).toString()
            delete listeSalle[i].rect[j]._attributes.style
        }
    } else {
        listeSalle[i].rect._attributes.id = (parseInt(i) * 100).toString()
    }
}


const calqueBatiment = aa[1 - CALQUE_STAND]
// const listeBatiment=calqueBatiment.a.find(b=>{return "g" in b})//rect salle
const listeBatiment = calqueBatiment.g
console.log(listeBatiment)
listeBatiment._attributes.id = "listeBatiment"
delete listeBatiment._attributes.style
delete listeBatiment._attributes["xlink:href"]
calqueBatiment.a.find(b => b.rect.length > 10).rect.forEach(r => {//passage
    delete r._attributes.style
})
for (const i in listeBatiment.a) {
    console.log(listeBatiment.a[i])
    listeBatiment.a[i]._attributes.id = "batiment" + (parseInt(i) + 1)
    listeBatiment.a[i].text._text = "salle " + (parseInt(i) + 1)
    delete listeBatiment.a[i].text.tspan
}


let file = convert.js2xml(data, {compact: true, spaces: 4})
console.log(file)
fs.writeFileSync("carteFormate.svg", file)