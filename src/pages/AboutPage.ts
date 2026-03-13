export function renderAboutPage(): string {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">About Us</h2>

      <div class="bg-white rounded-lg shadow-md p-8 mb-6">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="text-6xl">🚀</div>
          <div class="flex-1">
            <h3 class="text-2xl font-semibold mb-4">Welcome to TaskFlow</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              TaskFlow is a modern task management application designed to help you stay organized 
              and productive. Built with TypeScript and Tailwind CSS, we provide a clean and 
              intuitive interface for managing your daily tasks.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Whether you're managing personal projects or team workflows, TaskFlow makes it easy 
              to create, track, and complete your tasks efficiently.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div class="text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-semibold mb-2">Fast & Efficient</h3>
          <p class="text-gray-600">
            Lightning-fast performance with a responsive interface that works seamlessly across all devices.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div class="text-4xl mb-4">🎨</div>
          <h3 class="text-xl font-semibold mb-2">Beautiful Design</h3>
          <p class="text-gray-600">
            Clean and modern UI built with Tailwind CSS for an exceptional user experience.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div class="text-4xl mb-4">🔒</div>
          <h3 class="text-xl font-semibold mb-2">Secure & Reliable</h3>
          <p class="text-gray-600">
            Your data is stored securely with reliable performance you can count on.
          </p>
        </div>
      </div>

      <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h3 class="text-2xl font-bold mb-4">Our Mission</h3>
        <p class="text-lg leading-relaxed mb-4">
          We believe that productivity tools should be simple, beautiful, and accessible to everyone. 
          Our mission is to help individuals and teams achieve their goals by providing the best 
          task management experience possible.
        </p>
        <p class="text-lg leading-relaxed">
          Join thousands of users who trust TaskFlow to manage their daily tasks and projects.
        </p>
      </div>

      <div class="mt-8 bg-white rounded-lg shadow-md p-8">
        <h3 class="text-2xl font-semibold mb-6 text-center">Meet Our Team</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
              👨‍💻
            </div>
            <h4 class="font-semibold text-lg">John Doe</h4>
            <p class="text-gray-600">Founder & CEO</p>
          </div>
          <div class="text-center">
            <div class="w-24 h-24 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
              👩‍💻
            </div>
            <h4 class="font-semibold text-lg">Jane Smith</h4>
            <p class="text-gray-600">Lead Developer</p>
          </div>
          <div class="text-center">
            <div class="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
              👨‍🎨
            </div>
            <h4 class="font-semibold text-lg">Mike Johnson</h4>
            <p class="text-gray-600">UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
