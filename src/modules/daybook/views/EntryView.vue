<template>
    <div>
        <div v-if="entry">
            <div class="entry-title d-flex justify-content-between p-2">
                <div>
                    <span class="text-success fs-3 fw-bold">{{ day }}</span>
                    <span class="mx-1 fs-3">{{ month }}</span>
                    <span class="mx-2 fs-4 fw-light">{{ year }}</span>
                </div>
                <div>
                    <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">
                        Borrar
                        <i class="fa fa-trash-alt"></i>
                    </button>

                    <button class="btn btn-primary">
                        Subir foto
                        <i class="fa fa-upload"></i>
                    </button>
                </div>
            </div>
        </div>
        <hr>
        <div v-if="entry" class="d-flex flex-column px-3 h-75">
            <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
        </div>
        <img src="https://www.robertlandscapes.com/wp-content/uploads/2014/11/landscape-322100_1280.jpg" alt="entry-picture"
            class="img-thumbnail">

        <Fab @on:click="saveEntry" icon="fa-save" />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import { mapGetters, mapActions } from 'vuex'

import getDayMonthYear from '../helpers/getDayMonthYear'
export default {
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            entry: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const { day } = getDayMonthYear(this.entry.date)
            return day
        },
        month() {
            const { month } = getDayMonthYear(this.entry.date)
            return month
        },
        year() {
            const { year } = getDayMonthYear(this.entry.date)
            return year
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),

        loadEntry() {
            let entry;
            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }

            } else {
                entry = this.getEntryById(this.id)
                if (!entry) return this.$router.push({ name: "no-entry" })
            }
            this.entry = entry
        },
        async saveEntry() {
            if (this.entry.id) {
                await this.updateEntry(this.entry)
            } else {
                const id = await this.createEntry(this.entry)
                //Crear nuevo
                this.$router.push({ name: 'entry', params: { id: id } })
            }

        },
        async onDeleteEntry() {
            console.log('deleteo', this.entry)
            await this.deleteEntry(this.entry.id)
            return this.$router.push({ name: "no-entry" })
        }
    },
    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()

        }
    }
}
</script>


<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>