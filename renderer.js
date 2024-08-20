function openDiv(type) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear existing content
  
    const newDiv = document.createElement('div');
    newDiv.classList.add('draggable', 'resizable');
    newDiv.innerHTML = `<div class="header">${type} <button onclick="closeDiv(this)">Close</button></div><div class="body">${type} content</div>`;
    contentDiv.appendChild(newDiv);
  
    makeDraggable(newDiv);
    makeResizable(newDiv);
  }
  
  function closeDiv(button) {
    const div = button.parentElement.parentElement;
    div.remove();
  }
  
  function makeDraggable(element) {
    function makeDraggable(element) {
        let isDragging = false;
        let offsetX, offsetY;
      
        element.querySelector('.header').addEventListener('mousedown', (e) => {
          isDragging = true;
          offsetX = e.clientX - element.getBoundingClientRect().left;
          offsetY = e.clientY - element.getBoundingClientRect().top;
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });
      
        function onMouseMove(e) {
          if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
          }
        }
      
        function onMouseUp() {
          isDragging = false;
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }
      }
      //End of Draggable Logic
  }
  
  function makeResizable(element) {
    // Implement resizable logic here? 
  }
  
  // New code for draggable functionality
  const draggableWindow = document.getElementById('draggableWindow');
  const draggableHeader = document.getElementById('draggableHeader');
  const draggableContent = document.getElementById('draggableContent');

  let isDragging = false;
  let isResizing = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  draggableHeader.addEventListener('mousedown', dragStart);
  draggableWindow.addEventListener('mousedown', resizeStart);
  document.addEventListener('mousemove', dragOrResize);
  document.addEventListener('mouseup', dragOrResizeEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === draggableHeader) {
      isDragging = true;
    }
  }

  function resizeStart(e) {
    const rect = draggableWindow.getBoundingClientRect();
    if (
      e.clientX > rect.right - 10 &&
      e.clientY > rect.bottom - 10
    ) {
      isResizing = true;
      initialX = e.clientX;
      initialY = e.clientY;
    }
  }

  function dragOrResize(e) {
    if (isDragging) {
      drag(e);
    } else if (isResizing) {
      resize(e);
    }
  }

  function drag(e) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, draggableWindow);
  }

  function resize(e) {
    e.preventDefault();
    const width = draggableWindow.offsetWidth + (e.clientX - initialX);
    const height = draggableWindow.offsetHeight + (e.clientY - initialY);

    if (width > 100) {
      draggableWindow.style.width = width + 'px';
    }
    if (height > 100) {
      draggableWindow.style.height = height + 'px';
    }

    initialX = e.clientX;
    initialY = e.clientY;
  }

  function dragOrResizeEnd(e) {
    isDragging = false;
    isResizing = false;
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }

  // Modified openDiv function to use the draggable window
  function openDiv(content) {
    draggableContent.innerHTML = `<h2>${content}</h2>`;
    draggableWindow.style.display = 'block';
  }