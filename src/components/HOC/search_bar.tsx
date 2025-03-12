import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useDebounce } from '../../lib/hooks/useDebounce';
import DoctorCard from '../HOC/doctor_profile_card';

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  location: {
    city: string;
    state: string;
  };
}

interface SearchFilters {
  specialty: string;
  city: string;
  state: string;
  name: string;
}

const SPECIALTIES = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Gynecologist',
  'Psychiatrist',
  'Other'
];

export default function SearchComponent() {
  const [filters, setFilters] = useState<SearchFilters>({
    specialty: '',
    city: '',
    state: '',
    name: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const queryParams = new URLSearchParams();
        if (debouncedFilters.specialty) queryParams.append('specialty', debouncedFilters.specialty);
        if (debouncedFilters.city) queryParams.append('city', debouncedFilters.city);
        if (debouncedFilters.state) queryParams.append('state', debouncedFilters.state);
        if (debouncedFilters.name) queryParams.append('name', debouncedFilters.name);

        const response = await fetch(
          `https://three60clinicanimated-eureka.onrender.com/api/v1/patients/search-doctors?${queryParams.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }

        const data = await response.json();
        setSearchResults(data.doctors);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while searching');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [debouncedFilters]);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
              >
                <option value="">All Specialties</option>
                {SPECIALTIES.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                placeholder="Enter state"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results section */}
      <div className="mt-4">
        {isLoading ? (
          <div className="text-center text-gray-500 py-8">
            Searching for doctors...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            {error}
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No doctors found. Try adjusting your search criteria.
          </div>
        ) : (
          <div className="space-y-4">
            {searchResults.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}