document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = 'https://images-assets.nasa.gov/recent.json';
    const albumsContainer = document.getElementById('albums');

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const albums = data.collection.items;
        const randomAlbums = shuffleArray(albums).slice(0, 16);

        randomAlbums.forEach(async album => {
            const albumResponse = await fetch(album.href);
            const albumFiles = await albumResponse.json();

            const albumElement = document.createElement('div');
            
            albumElement.className = 'col-md-3 album';
            albumElement.innerHTML = `
                <div class="card">
                    <img src="${album.links[0].href}" class="card-img-top" alt="${album.data[0].title}">
                    <div class="card-body">
                        <h5 class="card-title">${album.data[0].title}</h5>
                        <p class="card-text">${new Date(album.data[0].date_created).toLocaleDateString('pt-BR')}</p>
                    </div>
                </div>
            `;

            albumElement.querySelector('img').addEventListener('click', () => {
                displayAlbumFiles(album.href);
            });

            albumsContainer.appendChild(albumElement);
        });

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function displayAlbumFiles(albumHref) {
    try {
        const albumResponse = await fetch(albumHref);
        const albumFiles = await albumResponse.json();

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Arquivos do Álbum</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row"></div>
                    </div>
                </div>
            </div>
        `;

        const filesContainer = modal.querySelector('.row');

        albumFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'col-md-4 mb-3';

            if (file.includes('.jpg') || file.includes('.png')) {
                fileElement.innerHTML = `<img src="${file}" class="img-fluid">`;
            } else if (file.includes('.mp4')) {
                fileElement.innerHTML = `<video controls class="img-fluid"><source src="${file}" type="video/mp4"></video>`;
            }

            filesContainer.appendChild(fileElement);
        });

        document.body.appendChild(modal);
        $(modal).modal('show');
        $(modal).on('hidden.bs.modal', () => modal.remove());

    } catch (error) {
        console.error('Erro ao buscar arquivos do álbum:', error);
    }
}
