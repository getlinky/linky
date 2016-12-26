<template>
    <div id="index">
        <header>
            <nav class="main-nav">
                <div class="items">
                    <div class="section">
                        <router-link to="/">
                            <h1 class="title">Linky</h1>
                        </router-link>
                    </div>
                    <div class="section settings-logout-save">
                        <a id="add-icon" @click='showAdd = true' class="icon">+</a>
                        <a id="settings-icon" @click='showSettings = true' class="icon">⚙</a>
                        <router-link to="/logout">Logout</router-link>
                        <!-- TODO: send request from here to log user out -->
                    </div>
                </div>
            </nav>
        </header>

        <nav class="list-options">
            <div class="search-option-section">
                <a class="icon">🔍</a>
                <input class="search" id="search" placeholder="search" type="search">
            </div>
            <div class="list-archive-option-section">
                <router-link to="/">List</router-link>
                <router-link class="inactive" to="/archive">Archive</router-link>
            </div>
        </nav>

        <ul class="link-container">
            <template v-if="list_items.length > 0">
                <template v-for="li in list_items">
                    <li class="display-on-hover-container" tabindex="0">
                        <h3 class="link-title">
                            <a :href="li.url">{{ li.title }}</a>
                        </h3>
                        <p class="description">{{ li.description }}</p>
                        <a class="source" :href="li.url">{{ li.url }}</a>
                        <button class="display-on-hover">Delete</button>
                        <button class="display-on-hover">{{ page_name === 'list' ? 'Archive' : 'Unarchive' }}</button>
                    </li>
                </template>
            </template>
            <template v-else>
                No items found.
            </template>
        </ul>
        <HelpModal @close='showHelp = false' v-show='showHelp'></HelpModal>
        <SettingsModal @close='showSettings = false' v-show='showSettings'></SettingsModal>
        <AddModal @close='showAdd = false' v-show='showAdd'></AddModal>
    </div>
</template>

<script>
import HelpModal from './HelpModal.vue'
import AddModal from './AddModal.vue'
import SettingsModal from './SettingsModal.vue'

export default {
    name: 'index',
    components: {
        HelpModal,
        AddModal,
        SettingsModal
    },
    data () {
        return {
            showAdd: false,
            showSettings: false,
            showHelp: false,
            list_items: [{
                'title': 'Default title',
                'description': 'A default description',
                'url': 'https://defaulturl.com'
            }]
        }
    },
}
    </script>
