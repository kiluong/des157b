async function loadMusicData() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const musicData = await response.json();
  
      const barGraph = document.querySelector('.bar-graph');
  
      const colors = [
        '#4266D8', // blue
        '#E8E059', // yellow
        '#65B565', // green
        '#800080', // purple
        '#C590D1', // light purple
        '#ADD8E6', // light blue
        '#FFC0CB', // pink
        '#C13C3C'  // red
      ];
  
      musicData.forEach((item, index) => {
        const barWrapper = document.createElement('div');
        barWrapper.style.display = 'flex';
        barWrapper.style.flexDirection = 'column';
        barWrapper.style.alignItems = 'center';
        barWrapper.style.position = 'relative';
  
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${parseFloat(item.percentage) * 3}px`;
        
        // 🎨 Assign a different color per bar
        bar.style.backgroundColor = colors[index % colors.length];
  
        const percentLabel = document.createElement('div');
        percentLabel.className = 'percent-label';
        percentLabel.textContent = item.percentage;
        percentLabel.style.opacity = '0';
  
        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = item.genre;
  
        barWrapper.appendChild(percentLabel);
        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);
        barGraph.appendChild(barWrapper);
  
        bar.addEventListener('mouseenter', function() {
          percentLabel.style.opacity = '1';
        });
  
        bar.addEventListener('mouseleave', function() {
          percentLabel.style.opacity = '0';
        });
      });
  
    } catch (error) {
      console.error('Failed to fetch music data:', error);
    }
  }
  
  // Call it
  loadMusicData();
  