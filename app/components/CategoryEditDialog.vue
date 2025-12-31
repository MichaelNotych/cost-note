<script setup lang="ts">

const props = defineProps<{
  open: boolean;
  category: Category;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "save", data: { name: string; icon: string }): void;
}>();

const name = ref(props.category.name);
const icon = ref(props.category.icon || "");

watch(() => props.category, (newVal) => {
    if (newVal) {
        name.value = newVal.name;
        icon.value = newVal.icon || "";
    }
}, { immediate: true });

const save = () => {
    emit("save", { name: name.value, icon: icon.value });
    emit("update:open", false);
}
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
      </DialogHeader>
      
      <div class="space-y-4 py-4">
        <Field>
            <FieldLabel>Name</FieldLabel>
            <Input v-model="name" placeholder="Category Name" />
        </Field>
        
        <Field>
            <FieldLabel>Icon</FieldLabel>
            <Input v-model="icon" placeholder="Emoji" />
        </Field>
      </div>

      <DialogFooter>
        <DialogClose as-child>
            <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button @click="save">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
