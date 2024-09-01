const inquirer = require("inquirer")
const allLogos = require('./displaylogo')
const fs = require('fs')
const path = require('path');
const figlet = require('figlet')

function writeafile(ciblesArray) {
    const asciiArtPath = path.join(__dirname, '../../', 'put_your_design_ascii/doxbinmy.txt');
    fs.readFile(asciiArtPath, 'utf8', (err, designAscii) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier ASCII art:', err);
            return;
        }
        ciblesArray.forEach(person => {
            const { name, age } = person;
            const outputFilePath = path.join(__dirname, '../../output_dox/', `${name}_dox.txt`);
            if (fs.existsSync(outputFilePath)) {
                console.log(`Le fichier ${outputFilePath} existe déjà. Retour au menu dans 5 secondes...`);
                setTimeout(() => {
                    console.log('Retour au menu...');
                    return true
                }, 5000);
                return true
            } else {
                figlet.text(name, { font: "Ghost" }, function (err, asciiArt) {
                    if (err) {
                        console.log('Erreur avec Figlet:', err);
                        return;
                    }

                    const filePath = '../files_structure.txt';

                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Erreur lors de la lecture du fichier:', err);
                            return;
                        }

                        const newData = data.replace(/{name_ascii}/g, asciiArt)
                            .replace(/{name_completed}/g, name)
                            .replace(/{age}/g, age)
                            .replace(/{design_ascii}/g, designAscii)
                        fs.writeFile(`../output_dox/${name}_dox.txt`, newData, 'utf8', (err) => {
                            if (err) {
                                console.error('Erreur lors de l\'écriture du fichier:', err);
                                return;
                            }
                            console.log('DOX created, check folder output_dox');
                        });
                    });
                })
            }

        })
    })

}

async function createDox() {
    allLogos.displayIt()
    const resp = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "His/Her firstname >>> ",
        },
        {
            type: "input",
            name: "lastname",
            message: "His/Her lastname >>> ",
        },
        {
            type: "input",
            name: "age",
            message: "His/Her age >>> ",
        },
    ])

    const fullname = `${resp.name} ${resp.lastname}`
    if (writeafile([{ name: fullname, age: resp.age }])) {
        return true
    } else {
        return false
    }
}

module.exports = {
    createDox
}