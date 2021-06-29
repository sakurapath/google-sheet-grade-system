module.exports = class Student {
    constructor(std) {
        //Building the object with the student data
        this.presenceRate = parseInt(std[2])
        this.p1 = parseInt(std[3])
        this.p2 = parseInt(std[4])
        this.p3 = parseInt(std[5])
        this.final = 0
    }

    //Testing either he is approved or not
    calculatePresence(classesQuantity) {
        let minimalPresence = classesQuantity * 0.25
        if (this.presenceRate > minimalPresence) {
            return 0
        }
        return 1
    }

    //Calculating his average mark and declaring a minimal final exam grade if necessary
    calculateGrade() {
        let averageGradeStd = (this.p1 + this.p2 + this.p3) / 3
        if (averageGradeStd < 50) {
            return "Reprovado por nota"
        } else if (averageGradeStd >= 50 && averageGradeStd < 70) {
            this.final = Math.ceil(100 - averageGradeStd)
            return "Exame Final"
        } else {
            return "Aprovado"
        }
    }
}