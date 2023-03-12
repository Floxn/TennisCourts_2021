class Court {

    #courtNumber = 0;
    #timeslot = [];
    
    set courtNumber (courtNumber) {
        if (this.#courtNumber >= 0) {
            this.#courtNumber = courtNumber;
        }
    }

    set timeslot (timeslot) {
        if (this.#timeslot.length >= 0) {
            this.#timeslot.push(timeslot);
        }
    }

    get timeslot () {
        if (this.#timeslot.length >= 0) {
            return this.#timeslot
        }
    }

    get courtNumber () {
        if (this.#courtNumber.length >= 0) {
            return this.#courtNumber
        }
    }


    #buildCourtHTML () {

        const courtNumberClass = `court-${this.#courtNumber}`;

        // Build Court Wrapper
        const newCourt = document.createElement('div');
        newCourt.classList.add('court', courtNumberClass);
        newCourt.id = courtNumberClass;

        // Build Court Headline
        const courtHeadline = document.createElement('h2');
        courtHeadline.textContent = `Court-No: ${this.#courtNumber}`;

        // Build Timeslots Wrapper
        const courtTimeSlots = document.createElement('div');
        courtTimeSlots.classList.add('court-slots');

        newCourt.appendChild(courtHeadline);
        newCourt.appendChild(courtTimeSlots);

        return newCourt;
    }
    
    render () {
        return this.#buildCourtHTML();
    }
}
