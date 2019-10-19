const measelesSymptom = [
    'fever',
    'runny nose',
    'dry cough',
    'sore throat',
    'inflamed eyes',
    'conjuctivitis',
    'pink eyes',
    'tired'
]
class Predict {
    getSymptoms = ()=>{
        return measelesSymptom;
    }
    predictDisease = (patientSymptoms) => {
        return (this.getSymptoms().filter(x => patientSymptoms.includes(x)).length) / ([...this.getSymptoms(), ...patientSymptoms].length)
    }
}

module.exports = Predict;