<template>
    <div class="form-group">
        <label v-bind="labelFor">{{ label }}</label>
        <input class="form-control" :class="{ 'is-invalid': getError }" v-bind="$attrs" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" />
        <div class="invalid-feedback" v-if="getError">
            {{ getError }}
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            default: null,
        },
        modelModifiers: {
            default: () => ({}),
        },
        error: {
            type: [Array, String],
            default: null,
        },
    },
    created() {
        console.log(this.$attrs);
    },
    computed: {
        labelFor() {
            return this.$attrs.id ? { for: this.$attrs.id } : {};
        },
        getError() {
            if (this.modelValue === "") {
                return Array.isArray(this.error) ? this.error.join(", ") : this.error;
            }
            return false;
        },
    },
};
</script>