class Predict {
    measelesSymptoms = [
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
        return (this.measelesSymptoms.filter(x => patientSymptoms.includes(x)).length) / ([...this.measelesSymptoms, ...patientSymptoms].length)
    }
}

module.exports = Predict;