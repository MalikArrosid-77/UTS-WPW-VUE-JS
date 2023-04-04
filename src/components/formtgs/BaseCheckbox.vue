<template>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)" v-bind="$attrs" />
        <label class="form-check-label">{{ label }}</label>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            required: true,
        },
    },
};
</script>