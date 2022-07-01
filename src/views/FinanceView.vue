<template>
  <div>Finace - Nothing in here for now {{ testEvent }}</div>
</template>

<script>
export default {
  name: "Finance",
  data: function () {
    return {
      testEvent: "String to change",
    };
  },
  created() {
    this.$emitter.on("date-changed", (evt) => {
      console.log(evt.date);
    });
  },
};
</script>

<style></style>
