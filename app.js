

const Search = {
    data() {
        return{
            devisesList: this.devisesList
        }
    },
    mounted() {
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/currencies`)
            .then((response) => {
                response.json().then((data) => {
                    this.devisesList = data

                })
            })
    },
    template: `<h2>Choisissez la devise de base</h2>

<input type="number" name="amout" id="amout" placeholder="24">

<select name="baseDevise" id="baseDevise">
<option value="">monnaie de base</option>
  <option v-for="(devise, index) in devisesList" :value="index">
    {{ devise }}
  </option>
</select>

  =>
  
<select name="devise" id="devise">
  <option value="">monnaie visée</option>
  <option v-for="(devise, index) in devisesList" :value="index">
    {{ devise }}
  </option>
  </select>
`
}

const Results = {
    data() {
        return{
        }
    },
    template: `<p>Results : </p>
<p id="result"></p>
`
}

const options = {
    data() {
        return{
            title: "Convertisseur de monnaie",
        }

    },
    mounted() {
        const baseDevise = document.querySelector("#baseDevise").value
        const devise = document.querySelector("#devise").value
        const amout = document.querySelector('#amout').value
        const host = 'api.frankfurter.app';

        fetch(`https://${host}/latest?amount=${amout}&from=${baseDevise}&to=${devise}`)
            .then((response) => {
                response.json().then((data) => {
                    const convertedResult = data.rates
                })
            })

    },
    methods:{
        convert(){
            const baseDevise = document.querySelector("#baseDevise").value
            const devise = document.querySelector("#devise").value
            const amout = document.querySelector('#amout').value


            const host = 'api.frankfurter.app';
            fetch(`https://${host}/latest?amount=${amout}&from=${baseDevise}&to=${devise}`)
                .then((response) => {
                    response.json().then((data) => {
                        const convertedResult = data.rates
                        const result = JSON.stringify(convertedResult)
                        const formattedResult = result.replace('{', '').replace('}', '')
                        document.querySelector("#result").innerHTML= formattedResult
                    })
                })
        }

    },
    components : {
        Results,
        Search

    },
}

Vue.createApp(options).mount("#app")
