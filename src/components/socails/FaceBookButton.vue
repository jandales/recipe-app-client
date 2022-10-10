<template>
      <a  :href="`/api/auth/facebook`"        
                class="group w-full flex items-center justify-center gap-2 p-3 mb-4 text-sky-500 hover:text-white text-center font-medium border text-xs leading-tight  rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-4 h-4">
               
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
                <label class="group-hover:text-white text-base mb-0 mr-4">Sign in with Facebook</label>
              </a>

</template>