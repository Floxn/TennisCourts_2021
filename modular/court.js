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
        const newCourt = createNewElement(
            'div',
            [courtNumberClass],
            '',
            {},
            courtNumberClass
        )

        // Build Court Headline
        const courtHeadline = createNewElement(
            'h2',
            [],
            `Court-No: 
            ${this.#courtNumber}`
        )

        // Build Timeslots Wrapper
        const courtTimeSlots = createNewElement(
            'div',
            ['court-slots']
        )

        this.#buildTimeslotHTML(courtTimeSlots);

        newCourt.appendChild(courtHeadline);
        newCourt.appendChild(courtTimeSlots);

        return newCourt;
    }

    #buildTimeslotHTML (courtTimeSlots) {
        this.#timeslot.forEach(timeSlot => {
            courtTimeSlots.appendChild(timeSlot.render(timeSlot));
        })
    }
    
    render () {
        return this.#buildCourtHTML();
    }
}
