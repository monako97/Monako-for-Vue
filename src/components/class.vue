<template>
    <main class="class-container">
        <article>
            <div> Continue Reading →</div>
            <unlike :id="id" :count="count" :like="like"/>
        </article>
    </main>
</template>
<script>
export default {
    data: function(){
        return {
            id: 3,
            count: 21,
            like: true
        };
    },
    components:{
        unlike: () => import(/* webpackChunkName: "unlike" */ './unlike'),
    }
}
</script>

<style lang="scss" scoped>
.class-container{
    @media (max-width: 880px){
        article{
            padding: 50px 20px 25px;
        }
    }
    @media (max-width: 700px){
        article{
            padding: 20px 20px 25px;
        }
    }
    @media (max-width: 580px){
        article{
            padding: 20px 20px 25px;
        }
    }
}

</style>
