let filterValue = 0;
let dataValue = 0;
let allUsers = [];

window.addEventListener('load', () => {
  filterValue = document.querySelector('#filter');
  dataValue = document.querySelector('#data');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchData();

});

async function fetchData() {
  const response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await response.json();
  allUsers = json.results.map(user => {
    const { name, dob, gender, picture } = user;
    return {
      name: `${name.first} ${name.last}`,
      age: dob.age,
      gender,
      picture: picture.thumbnail,
    };
  });
}

function handleKeyUp(event) {
  if (event.key === 'Enter') {
    let text = document.getElementById("pesquisa").value;
    
    if (text.length > 0) {
      let filteredUSer = doFilterUser(text);
      let html = `${filteredUSer.length} Usuário(s) encontrado(s)`;
      filteredUSer.forEach(user => {
        html += `
                <div>
                   <img src="${user.picture}"/> ${user.name}, ${user.age}
                </div>
                `;
        
      });
      const { male, female, total } = filteredUSer.reduce(
        (acc, curr) => {
          switch (curr.gender) {
            case 'male':
              acc.total += curr.age;
              acc.male += 1;
              break;
            case 'female':
              acc.total += curr.age;
              acc.female += 1;
              break;
            default:
              break;
          }
          return acc;
        },
        {
          female: 0,
          male: 0,
          total: 0,
        },
      );
      //
      console.log(male);
      console.log(female);
      console.log(total);
      //
      let summary = `<div>
                      <p>Estatistica</p>
                      <ul>
                        <li>Sexo Masciulo: ${male}</li>
                        <li>Sexo Feminino: ${female}</li>
                        <li>Soma das Idades: ${total}</li>
                        <li>Média das Idades: ${total/filteredUSer.length}</li>
                    </div>`;
      //
      document.getElementById("filtrado").innerHTML = html;
      document.getElementById("data").innerHTML = summary;
    } else {
      document.getElementById("filtrado").innerHTML = `Nenhum usuário Filtrado`;
      document.getElementById("summary").innerHTML = `Nada a exibir`;
    }
  }
}

function doFilterUser(text) {
  return allUsers.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
}