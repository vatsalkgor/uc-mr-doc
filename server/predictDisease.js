
class Predict {
    constructor(){
        this.measelesSymptom = [
            'fever',
            'runny nose',
            'dry cough',
            'sore throat',
            'inflamed eyes',
            'conjuctivitis',
            'pink eyes',
            'tired'
        ]
    }
    predictDisease (patientSymptoms)  {
        return (this.measelesSymptom.filter(x => patientSymptoms.includes(x)).length) / ([...this.measelesSymptom, ...patientSymptoms].length);
    }
}

module.exports = Predict;