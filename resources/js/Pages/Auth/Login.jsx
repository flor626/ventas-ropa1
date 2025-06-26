import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            {status && (
                <div className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800 shadow-sm border border-green-300">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                        autoComplete="email"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Contraseña */}
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Recordarme y Olvidé */}
                <div className="flex items-center justify-between text-sm text-gray-700">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2">Recordarme</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-green-600 hover:text-green-800 hover:underline transition duration-200"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                {/* Botón */}
                <div>
                    <PrimaryButton
                        className="w-full justify-center bg-green-600 hover:bg-green-700 text-white font-semibold text-base py-2 px-4 rounded-xl shadow-lg transition-all duration-300"
                        disabled={processing}
                    >
                        Iniciar Sesión
                    </PrimaryButton>
                </div>
            </form>

            {/* Enlace registro */}
            <div className="mt-6 text-center text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link
                    href={route('register')}
                    className="font-semibold text-green-600 hover:text-green-800 hover:underline transition duration-200"
                >
                    Regístrate aquí
                </Link>
            </div>
        </GuestLayout>
    );
}
