import React, { useState } from 'react';
import { StoreFront } from './components/StoreFront';
import { AdminDashboard } from './components/AdminDashboard';
import { GlassCard, Button, Input, ToastContainer, ToastType, Toast } from './components/UI';
import { ViewState, Product, Slide } from './types';
import { INITIAL_PRODUCTS, INITIAL_SLIDES } from './constants';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('STORE');
  const [isLoading, setIsLoading] = useState(false);
  
  // Shared State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [slides, setSlides] = useState<Slide[]>(INITIAL_SLIDES);
  const [toasts, setToasts] = useState<{ id: number, type: ToastType, message: string }[]>([]);

  // Toast System
  const addToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Fake Login logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setViewState('ADMIN_DASHBOARD');
      setIsLoading(false);
      addToast('success', 'Login realizado com sucesso!');
    }, 1000);
  };

  return (
    <>
      {viewState === 'STORE' && (
        <StoreFront 
          onAdminClick={() => setViewState('ADMIN_LOGIN')} 
          products={products} 
          setProducts={setProducts} 
          slides={slides} 
          setSlides={setSlides}
          addToast={addToast}
        />
      )}

      {viewState === 'ADMIN_LOGIN' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <GlassCard className="w-full max-w-md p-8 md:p-10 animate-in zoom-in-95 duration-500">
             <div className="text-center mb-8">
               <div className="w-14 h-14 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-2xl text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl shadow-violet-500/30">S</div>
               <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Login</h2>
               <p className="text-gray-500 mt-2">Entre para gerenciar o SARAH CATALOGUE</p>
             </div>
             
             <form onSubmit={handleLogin} className="space-y-5">
               <Input label="Email Corporativo" type="email" placeholder="admin@sarahcatalogue.com" defaultValue="admin@sarahcatalogue.com" className="bg-white/50" />
               <Input label="Senha" type="password" placeholder="••••••••" defaultValue="password" className="bg-white/50" />
               
               <div className="flex items-center justify-between text-sm">
                 <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                   <input type="checkbox" className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                   Lembrar-me
                 </label>
                 <button type="button" className="text-violet-600 hover:text-violet-700 font-medium hover:underline">Esqueceu a senha?</button>
               </div>

               <Button fullWidth size="lg" disabled={isLoading} className="mt-4 shadow-xl">
                 {isLoading ? 'Autenticando...' : 'Acessar Dashboard'}
               </Button>
             </form>

             <div className="mt-8 pt-6 border-t border-gray-100/50 text-center">
               <button 
                  type="button" 
                  onClick={() => setViewState('STORE')}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto"
               >
                 ← Voltar para a Loja
               </button>
             </div>
          </GlassCard>
        </div>
      )}

      {viewState === 'ADMIN_DASHBOARD' && (
        <AdminDashboard 
          onLogout={() => setViewState('STORE')} 
          products={products} 
          setProducts={setProducts} 
          slides={slides} 
          setSlides={setSlides}
          addToast={addToast}
        />
      )}

      {/* Global Toast Container */}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
             <Toast type={t.type} message={t.message} onClose={() => removeToast(t.id)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default App;