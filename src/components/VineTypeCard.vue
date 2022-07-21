<template>
  <q-card>
    <q-img
      :src="vine.imagen"
      :alt="vine.nombre"
      :fit="cover"
      class="course-img"
    />
    <q-card-section>
      <div class="text-h6">{{ vine.nombre }}</div>
      <div class="text-subtitle2">
        {{ vine.texto }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "VineTypeCard",
  props: ["vine"],
};
</script>

<style>
.course-img {
  min-height: 200px;
  max-height: 200px;
}
</style>