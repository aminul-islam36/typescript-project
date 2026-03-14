export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          About TaskFlow
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          TaskFlow is a modern task management app built with React, TypeScript,
          Tailwind CSS, and MongoDB.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Create, organize, and track your tasks with priorities and statuses to
          stay productive.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["React", "TypeScript", "Tailwind CSS", "MongoDB"].map((tech) => (
            <div key={tech} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="font-semibold text-gray-800">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
