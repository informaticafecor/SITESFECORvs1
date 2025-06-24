 /**
         * Abre un documento específico
         */
        function openDocument(documentType) {
            switch(documentType) {
                case 'convenio-cooperacion':
                    alert('📄 Descargando: Convenio de Cooperación Interinstitucional (EME)');
                    // Aquí puedes agregar la lógica para descargar el PDF real
                    // window.open('ruta/al/convenio-cooperacion.pdf', '_blank');
                    break;
                case 'cambio-designacion':
                    alert('🔄 Descargando: Cambio de Designación EME - Delitos Ambientales');
                    // window.open('ruta/al/cambio-designacion.pdf', '_blank');
                    break;
                default:
                    alert('📄 Documento no encontrado');
            }
        }

        // Inicialización simple
        document.addEventListener('DOMContentLoaded', function() {
            console.log('✅ Coordinaciones Interinstitucionales cargado');
        });

