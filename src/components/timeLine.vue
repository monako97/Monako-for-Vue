<template>
    <main class="time-container">
        <article>
            <div> Continue Reading →</div>
        </article>
    </main>
</template>
<script>
export default {
    data: function(){
        return {};
    }
}
</script>

<style lang="scss" scoped>
.time-container{
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