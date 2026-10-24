<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    protected $table = 'laporans';

    protected $fillable = [
        'user_id',
        'nama',
        'lokasi',
        'kategori',
        'deskripsi',
        'status',
        'hasil_penanganan',
    ];
}
