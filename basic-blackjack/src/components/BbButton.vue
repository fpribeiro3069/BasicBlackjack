<template>
    <button class="unselectable" :class="getClass" @click="emitClick">
        {{ label }}
    </button>
</template>

<script>
export default {
    name: 'bb-button',
    emits: [
        'click'
    ],
    props: {
        label: {
            type: String,
            required: false,
            default: "",
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        emitClick() {
            if (!this.disabled) {
                this.$emit('click')
            }
        }
    },
    computed: {
        getClass() {
            return this.disabled ? 'bb-button-disabled' : 'bb-button';
        }
    }
}
</script>

<style lang="scss" scoped>
.bb-button {
    text-transform: uppercase;
    font-weight: 700;
    width: 100%;
    
    background: $highlight-green;
    border: 1px solid $white;
    border-radius: 4px;
    color: $white;

    padding: .2rem .5rem .2rem .5rem;
    margin: .1rem;

    -webkit-box-shadow: $button-shadow;
    box-shadow: $button-shadow;

    transition: ease-in-out .3s;
}

.bb-button:hover {
    background: $ultra-highlight-green;
    box-shadow: $button-hover-shadow;
}

.bb-button-disabled {
    cursor: default;
    text-transform: uppercase;
    font-weight: 700;
    width: 100%;

    background: $dark-green;
    border: 1px solid $white;
    border-radius: 4px;
    color: $white;

    padding: .2rem .5rem .2rem .5rem;
    margin: .1rem;

    transition: ease-in-out .3s;
}
</style>