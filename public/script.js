        // Event listener untuk Enter key
        document.getElementById('cityInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                getWeather();
            }
        });

        // Quick search function
        function quickSearch(city) {
            document.getElementById('cityInput').value = city;
            getWeather();
        }

        // Main weather function
        async function getWeather() {
            const city = document.getElementById('cityInput').value.trim();
            
            if (!city) {
                showError('Silakan masukkan nama kota terlebih dahulu');
                return;
            }

            hideAll();
            showLoading();

            try {
                const [weatherResponse, forecastResponse] = await Promise.all([
                    fetch(`http://localhost:3000/api/weather?city=${encodeURIComponent(city)}`),
                    fetch(`http://localhost:3000/api/forecast?city=${encodeURIComponent(city)}`)
            ]);

                const weatherData = await weatherResponse.json();
                const forecastData = await forecastResponse.json();

                displayWeather(weatherData);
                displayForecast(forecastData);
            } catch (error) {
                console.error('Error:', error);
                showError(error.message);
            } finally {
                hideLoading();
        }   
    }
        // Get location weather
        async function getLocationWeather() {
            if (!navigator.geolocation) {
                showError('❌ Geolocation tidak didukung oleh browser Anda');
                return;
            }

            hideAll();
            showLoading();

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    try {
                        const [weatherResponse, forecastResponse] = await Promise.all([
                            fetch(`http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`),
                            fetch(`http://localhost:3000/api/forecast?lat=${latitude}&lon=${longitude}`)
                        ]);

                        if (!weatherResponse.ok) {
                            if (weatherResponse.status === 401) {
                                throw new Error('⚠️ API Key tidak valid! Silakan ganti API_KEY di kode dengan API key Anda dari OpenWeatherMap.org');
                            }
                            throw new Error('Gagal mengambil data cuaca');
                        }

                        const weatherData = await weatherResponse.json();
                        const forecastData = await forecastResponse.json();

                        document.getElementById('cityInput').value = weatherData.name;
                        displayWeather(weatherData);
                        displayForecast(forecastData);
                    } catch (error) {
                        console.error('Error:', error);
                        showError(error.message);
                    } finally {
                        hideLoading();
                    }
                },
                (error) => {
                    hideLoading();
                    let errorMessage = '📍 Tidak dapat mengakses lokasi Anda. ';
                    
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage += 'Izin lokasi ditolak. Aktifkan izin lokasi di pengaturan browser.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage += 'Informasi lokasi tidak tersedia.';
                            break;
                        case error.TIMEOUT:
                            errorMessage += 'Permintaan lokasi timeout. Coba lagi.';
                            break;
                        default:
                            errorMessage += 'Terjadi kesalahan yang tidak diketahui.';
                            break;
                    }
                    
                    showError(errorMessage);
                }
            );
        }

        // Display weather data
        function displayWeather(data) {
            const temp = Math.round(data.main.temp);
            const iconMap = {
                '01d': '☀️', '01n': '🌙',
                '02d': '⛅', '02n': '☁️',
                '03d': '☁️', '03n': '☁️',
                '04d': '☁️', '04n': '☁️',
                '09d': '🌧️', '09n': '🌧️',
                '10d': '🌦️', '10n': '🌧️',
                '11d': '⛈️', '11n': '⛈️',
                '13d': '❄️', '13n': '❄️',
                '50d': '🌫️', '50n': '🌫️'
            };

            document.getElementById('weatherIconLarge').textContent = iconMap[data.weather[0].icon] || '🌤️';
            document.getElementById('temperatureLarge').textContent = `${temp}°C`;
            document.getElementById('weatherDescription').textContent = data.weather[0].description;
            document.getElementById('locationName').textContent = `${data.name}, ${data.sys.country}`;
            
            // Temperature badge
            let badge = '';
            if (temp >= 35) {
                badge = '<span class="badge badge-hot">🔥 Sangat Panas</span>';
            } else if (temp >= 28) {
                badge = '<span class="badge badge-hot">☀️ Panas</span>';
            } else if (temp >= 20) {
                badge = '<span class="badge badge-moderate">🌤️ Nyaman</span>';
            } else if (temp >= 10) {
                badge = '<span class="badge badge-cool">🌥️ Sejuk</span>';
            } else if (temp >= 0) {
                badge = '<span class="badge badge-cold">❄️ Dingin</span>';
            } else {
                badge = '<span class="badge badge-freezing">🥶 Sangat Dingin</span>';
            }

            document.getElementById('tempBadge').innerHTML = badge;

            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
            document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
            document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
            document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
            document.getElementById('clouds').textContent = `${data.clouds.all}%`;
            
            const directions = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
            const index = Math.round(data.wind.deg / 45) % 8;
            document.getElementById('windDirection').textContent = directions[index];
            
            document.getElementById('coordinates').innerHTML = `${data.coord.lat.toFixed(2)}°<br>${data.coord.lon.toFixed(2)}°`;
            
            const sunrise = new Date(data.sys.sunrise * 1000);
            const sunset = new Date(data.sys.sunset * 1000);
            document.getElementById('sunrise').textContent = sunrise.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            document.getElementById('sunset').textContent = sunset.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            
            const now = new Date();
            document.getElementById('lastUpdate').textContent = `Diperbarui: ${now.toLocaleTimeString('id-ID')}`;

            document.getElementById('weatherMain').classList.add('active');
        }

        // Display forecast data
        function displayForecast(data) {
            const forecastGrid = document.getElementById('forecastGrid');
            forecastGrid.innerHTML = '';

            const dailyData = {};
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString('id-ID');
                if (!dailyData[date]) {
                    dailyData[date] = item;
                }
            });

            const days = Object.values(dailyData).slice(0, 5);
            const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

            const iconMap = {
                '01d': '☀️', '01n': '🌙',
                '02d': '⛅', '02n': '☁️',
                '03d': '☁️', '03n': '☁️',
                '04d': '☁️', '04n': '☁️',
                '09d': '🌧️', '09n': '🌧️',
                '10d': '🌦️', '10n': '🌧️',
                '11d': '⛈️', '11n': '⛈️',
                '13d': '❄️', '13n': '❄️',
                '50d': '🌫️', '50n': '🌫️'
            };

            days.forEach((day, index) => {
                const date = new Date(day.dt * 1000);
                const dayName = index === 0 ? 'Hari Ini' : dayNames[date.getDay()];
                
                const card = document.createElement('div');
                card.className = 'forecast-card';
                card.innerHTML = `
                    <div class="forecast-day">${dayName}</div>
                    <div class="forecast-icon">${iconMap[day.weather[0].icon] || '🌤️'}</div>
                    <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
                    <div class="forecast-desc">${day.weather[0].description}</div>
                `;
                forecastGrid.appendChild(card);
            });

            document.getElementById('forecastContainer').classList.add('active');
        }

        // Show error message
        function showError(message) {
            const errorEl = document.getElementById('error');
            errorEl.textContent = message;
            errorEl.classList.add('active');
            setTimeout(() => {
                errorEl.classList.remove('active');
            }, 8000);
        }

        // Show loading
        function showLoading() {
            document.getElementById('loading').classList.add('active');
        }

        // Hide loading
        function hideLoading() {
            document.getElementById('loading').classList.remove('active');
        }

        // Hide all sections
        function hideAll() {
            document.getElementById('error').classList.remove('active');
            document.getElementById('weatherMain').classList.remove('active');
            document.getElementById('forecastContainer').classList.remove('active');
        }

        let lastScrollTop = 0;
        const footer = document.querySelector("footer");

        window.addEventListener("scroll", () => {
         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            footer.style.bottom = "0";
        } else {
            footer.style.bottom = "-100px";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    });
