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
    predictDisease = (patientSymptoms) => {
        return (measelesSymptom.filter(x => patientSymptoms.includes(x)).length) / ([...measelesSymptom, ...patientSymptoms].length)
    }
}

module.exports = Predict;