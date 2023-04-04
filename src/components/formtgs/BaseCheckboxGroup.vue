<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <div>
            <div :class="classes" v-for="(option, index) in options" :key="`checkbox-${option.value}`">
                <input class="form-check-input" type="checkbox" :value="option.value" :checked="isChecked(option.value)"
                    @change="handleChange" />
                <label :for="`${id}-${index}`" class="form-check-label">{{ option.text }}</label>
            </div>
        </div>
    </div>
</template>

<script>
function randomStr() {
    return Math.random().toString(36).substring(7);
}

export default {
    methods: {
        isChecked(value) {
            return this.modelValue.includes(value);
        },

        handleChange(event) {
            const checked = event.target.checked;
            let value = event.target.value;
            if (!isNaN(value)) {
                value = Number(value);
            }
            const newValues = [...this.modelValue];

            if (checked) {
                newValues.push(value);
            } else {
                const index = newValues.indexOf(value);
                newValues.splice(index, 1);
            }

            this.$emit("update:modelValue", newValues);
        },
    },
    props: {
        modelValue: {
            type: Array,
            default: () => [],
        },
        options: {
            type: Array,
            default: () => [],
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        inline: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            default: randomStr(),
        },
    },

    inheritAttrs: false,
    computed: {
        classes() {
            return ["form-check", this.inline ? "form-check-inline" : ""];
        },
    },
};
</script>