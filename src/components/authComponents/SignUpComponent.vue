<template>
    <v-card class="mx-auto pt-3" max-width="500" rounded="xl">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
        </v-card-title>

        <v-window v-model="step">
            <v-window-item :value="1">
                <v-card-text>
                    <v-text-field :rules="[rulesIsRequired, rulesIsEmail]" variant="outlined" density="compact"
                        label="Email" type="email" v-model="form.email">
                    </v-text-field>
                </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
                <v-card-text>
                    <v-text-field :rules="[rulesIsRequired, rulesIsRightDateFormat]" variant="outlined"
                        density="compact" label="Birthdate" placeholder="DD/MM/YYYY" type="text"
                        v-model="form.birthdate"></v-text-field>
                    <v-select transition="scroll-y-transition" :items="Object.keys(lifeExpectancy)"
                        :rules="[rulesIsRequired]" variant="outlined" density="compact" label="Country" type="text"
                        v-model="form.country"></v-select>
                </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
                <v-card-text>
                    <v-text-field :rules="[rulesIsRequired, rulesMinLength]" variant="outlined" density="compact"
                        label="Password" type="password" v-model="form.password"></v-text-field>
                </v-card-text>
            </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn rounded="xl" v-if="step > 1" text @click="cancel"> Cancel </v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="contained-text" rounded="xl" v-if="step < 3" color="primary" @click="step++"
                :disabled="!filled">
                Next
            </v-btn>
            <v-btn variant="contained-text" rounded="xl" v-else color="primary" @click="signUp" :disabled="!filled">
                Sign Up </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import lifeExpectancy from "@/assets/json/lifeExpectancy.json"
export default {
    name: "SignUpView",
    data: () => ({
        lifeExpectancy: lifeExpectancy,
        step: 1,
        filled: false,
        form: {
            email: null,
            password: null,
            birthdate: null,
            country: null
        },
    }),
    methods: {
        cancel() {
            this.step = 1;
            this.form = {};
        },
        async signUp() {
            const col = collection(this.$db, "accs")
            createUserWithEmailAndPassword(this.$auth, this.form.email, this.form.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setDoc(doc(col, user.uid), {
                        email: this.form.email,
                        uid: user.uid,
                        birthdate: this.form.birthdate,
                        country: this.form.country,
                        lifeExpectancy: lifeExpectancy[this.form.country]
                    })
                        .then(() => {
                            this.$router.push("/")
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            alert(errorCode, errorMessage)
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode, errorMessage)
                    console.log(error)
                });
        },
        rulesIsEmail(v) {
            if (v.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                this.filled = true
            }
            else {
                return 'Not an Email'
            }
        },
        rulesIsRightDateFormat(v) {
            if (v.match(/\d\d\/\d\d\/\d\d\d\d/)) {
                this.filled = true
            }
            else {
                return 'Incorrect date format'
            }
        },
        rulesMinLength(v) {
            if (v.length >= 8) {
                this.filled = true
            }
            else {
                return 'Min 8 characters'
            }
        },
        rulesIsRequired(v) {
            if (!!v) {
                this.filled = true
            }
            else {
                return 'Required.'
            }
        },
    },
    computed: {
        currentTitle() {
            switch (this.step) {
                case 1:
                    return "Enter Email";
                case 2:
                    return "Set Data";
                default:
                    return "Create A Password";
            }
        },
    },
};
</script>

<style>
</style>