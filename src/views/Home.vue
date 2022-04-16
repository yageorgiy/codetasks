<template>
    <!--  d-flex justify-content-center align-items-center -->
    <div class="page">
        <h1></h1>
        <p></p>

        <b-jumbotron>
            <template #header>
                {{$t('home.contents.h1')}}
            </template>

<!--            <template #lead>
                {{$t('home.contents.p1')}}
            </template> -->

            <!--
            <hr class="my-4">

            <div>
                <b-card-group deck>
                    <b-card
                            bg-variant="light"
                            :header="$t('home.contents.card1.title')"
                            class="text-center"
                    >
                        <b-card-text>{{$t('home.contents.card1.contents')}}</b-card-text>
                    </b-card>

                    <b-card
                            bg-variant="light"
                            :header="$t('home.contents.card2.title')"
                            class="text-center"
                    >
                        <b-card-text>{{$t('home.contents.card2.contents')}}</b-card-text>
                    </b-card>

                    <b-card
                            bg-variant="light"
                            :header="$t('home.contents.card3.title')"
                            class="text-center"
                    >
                        <b-card-text>{{$t('home.contents.card3.contents')}}</b-card-text>
                    </b-card>
                </b-card-group>
            </div>
            -->
        </b-jumbotron>

    </div>
</template>

<style scoped>
    .page{
        /*height: 90vh !important;*/
        /*min-height: 500px !important;*/
    }
</style>

<script lang="ts">
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue';
    import {$t} from '@/lang';
    import { Client } from '@/ts/class/api/Client';

    export default {
        name: 'Home',
        props: {
            client: Client
        },
        components: {
            HelloWorld
        },
        data(){
            return{
                $t: $t
            }
        }
    }
</script>