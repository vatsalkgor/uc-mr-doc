class Predict {
    static measelesSymptoms = [
        'fever',
        'runny nose',
        'dry cough',
        'sore throat',
        'inflamed eyes',
        'conjuctivitis',
        'pink eyes',
        'tired'
    ]
    predictDisease = (patientSymptoms) => {
        return (measelesSymptoms.filter(x => patientSymptoms.includes(x)).length) / ([...measelesSymptoms, ...patientSymptoms].length)
    }
}

module.exports = Predict;