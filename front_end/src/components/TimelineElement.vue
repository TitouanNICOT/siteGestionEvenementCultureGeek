<template>
    <section>
        <div class="hours-container">
      <span
          class="hours-element"
          v-for="(hour, i) in hours"
          :style="{left: (i * 180) + 'px'}"
          :key="i"
      >
        {{ hour % 24 }}h
      </span>
        </div>

        <div
            class="calendar-container"
            v-for="(scene, i) in scenes"
            :key="i"
        >
            <div
                class="scene"
                style="background-color: lightcoral"
            >
                {{ scene.nomStand }}
            </div>
            <div class="calendar-element">
                <div
                    class="calendar-event"
                    v-for="(event, j) in scene.evenements"
                    :style="{backgroundColor: getRandomColor(), left: event.left, width: event.width}"
                    :key="j"
                >
          <span>
            {{ event.libelleEvenement }}
          </span>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
:host {
    display: block;
    width: fit-content;
    height: fit-content;
}

section {
    overflow-x: scroll;
}

.hours-container {
    position: relative;
    margin-bottom: 24px;
    height: 30px;
    margin-left: 20px;
}

.hours-element {
    position: absolute;
    transform: translateX(-50%);
    top: 0;
    font-weight: 400;
    font-size: 1.2rem;
}

.calendar-container {
    width: fit-content;
    display: flex;
}

.scene {
    z-index: 1;
    position: absolute;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 80px;
    width: 180px;
    font-weight: 400;
    font-size: 1.2rem;
    background-color: black;
    color: white;
}

.calendar-element {
    padding-top: 80px;
    margin-left: 190px;
    position: relative;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(auto-fit, 180px)
}

.calendar-event > * {
    font-weight: 400;
    font-size: 1.2rem;
}

.calendar-element .calendar-event {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    color: white;
    background-color: #2AABE2;
    height: 80px;
}

</style>

<script>
import myaxios from "@/services/axios";

export default {
    name: 'TimelineElement',
    components: {},
    data() {
        return {
            hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
            scenes: []
        }
    },
    async beforeMount() {
        this.scenes = await myaxios.get('/stands/withEvents')
            .then(response => {
                return response.data.data;
            })
            .catch(error => {
                console.log(error);
            });

        // console.log(this.scenes);
        this.updateEvents();
    },
    methods: {
        getRandomColor() {
            return "#" + ((1 << 24) * Math.random() | 0).toString(16);
        },
        updateEvents() {
            this.scenes.forEach((scene) => {
                scene.evenements.forEach((event) => {
                    let heureDebut = new Date(event.heureDebut);
                    let heureFin = new Date(event.heureFin);
                    heureDebut.setHours(heureDebut.getHours()+2);
                    heureFin.setHours(heureFin.getHours()+2);

                    event.width = (Math.abs(heureDebut - heureFin) / 1000 / 60 / 60 * 180) + 'px';
                    event.left = ((heureDebut.getHours() + (heureFin.getMinutes() / 60)) - 14) * 180 + 'px';
                });
            })
        }
    }
}
</script>
