<template>
    <v-card class="mx-auto pt-3" max-width="500" elevation="4" rounded="xl">
        <v-card-title>
            <span>Sign In</span>
        </v-card-title>

        <v-card-text>
            <v-text-field variant="outlined" density="compact" type="email" color="primary" label="Email"
                v-model="form.email"></v-text-field>
            <v-text-field variant="outlined" density="compact" type="password" color="primary" label="Password"
                v-model="form.password"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signIn" @keydown.enter="signIn" rounded="xl" variant="contained-text"> Sign
                In
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

import { signInWithEmailAndPassword } from "firebase/auth";
export default {
    data: () => ({
        form: {
            email: null,
            password: null
        }
    }),
    methods: {
        async signIn() {
            signInWithEmailAndPassword(this.$auth, this.form.email, this.form.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.$router.push("/")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode, errorMessage)
                });
        }
    },
}
</script>

<style>
</style>