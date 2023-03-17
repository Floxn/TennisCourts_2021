// TODO wie bekomme ich das jetzt alles zusammen, das in facility.js alles aufgebaut wird.

class Facility {
    #courts = [];

    set courts (courts) {
        if (this.#courts.length >= 0) {
            this.#courts = courts;
        }
    }

    #buildFacilityHTML () {
        const facility = document.createElement('div');
        facility.id = 'tennisFacility';

        return facility

    }

    render () {
        this.#buildFacilityHTML();
    }
}


const court = new Court();
court.courtNumber = 1;
for (let timeSlots = 7; timeSlots <= 21; timeSlots++) {
    const timeslot1 = new Timeslot();
    timeslot1.begin = `${timeSlots}:00 Uhr`;
    timeslot1.end = `${timeSlots + 1}:00 Uhr`;
    console.log(timeslot1.playerCollection)

    // document.body.appendChild(timeslot1.render())
    court.timeslot = timeslot1;
}


document.body.appendChild(court.render())


const facility = new Facility();
console.log(facility);