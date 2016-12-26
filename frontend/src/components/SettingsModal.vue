<template>
    <div class="modal-container settings" id="settings">
        <div class="modal-inner">
            <div class="modal">
                <nav>
                    <h1>Settings</h1>
                    <h1><a class="close" @click="$emit('close')">✕</a></h1>
                </nav>

                <form action="" method="post">
                    <!-- {% csrf_token %} -->
                    <!-- {{ form.errors }} -->
                    <!-- {{ form.non_field_errors }} -->
                    <!-- {{ form }} -->
                    <input type="submit" value="Save">
                </form>
                <p><a href="{% url 'download_links_json' %}">Download Links</a></p>
                <p><a href="">Password Reset</a></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'settings-modal'
}
</script>
